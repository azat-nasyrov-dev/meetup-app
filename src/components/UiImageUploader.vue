<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === $options.States.LOADING }"
      :style="state !== $options.States.EMPTY && `--bg-url: url('${imageSrc}')`"
    >
      <span class="image-uploader__text">{{ stateText }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @change="handleFileSelect"
        @click="handleClick"
      />
    </label>
  </div>
</template>

<script>
const States = {
  EMPTY: 'EMPTY',
  LOADING: 'LOADING',
  FILLED: 'FILLED',
};

export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  States,

  props: {
    uploader: {
      type: Function,
    },

    preview: {
      type: String,
    },
  },

  emits: ['upload', 'select', 'error', 'remove'],

  data() {
    return {
      // Храним текущее состояние
      // Начальное состояние зависит от того, передан ли preview
      state: this.preview ? States.FILLED : States.EMPTY,
      // Текущее изображение тоже храним локально
      localPreview: null,
    };
  },

  computed: {
    stateText() {
      return {
        [States.EMPTY]: 'Загрузить изображение',
        [States.LOADING]: 'Загрузка...',
        [States.FILLED]: 'Удалить изображение',
      }[this.state];
    },

    imageSrc() {
      // Текущее изображение - либо уже выбранное локальное, либо изначальное превью
      // Для удалённого изображения здесь будет ссылка на preview, но не будет выводиться
      return this.localPreview ?? this.preview;
    },
  },

  beforeUnmount() {
    // Чистим созданный идентификатор на изображение компонента
    if (this.localPreview) {
      URL.revokeObjectURL(this.localPreview);
    }
  },

  methods: {
    async handleFileSelect($event) {
      // Достаём файл из события (инпута) и отдаём с событием родителю
      const file = $event.target.files[0];
      this.$emit('select', file);
      // Создаём ссылку на текущий файл для отображения
      this.localPreview = URL.createObjectURL(file);
      // Если нет загрузчика, работа с файлом завершена
      if (!this.uploader) {
        this.state = States.FILLED;
        return;
      }
      // Загружаем файл
      return await this.upload(file);
    },

    async upload(file) {
      this.state = States.LOADING;
      try {
        const result = await this.uploader(file);
        this.$emit('upload', result);
        this.state = States.FILLED;
      } catch (error) {
        this.$emit('error', error);
        this.state = States.EMPTY;
        // Не забываем сбросить файл в случае не успешной загрузки
        // Иначе нельзя будет выбрать тот же файл
        this.removeFile();
      }
    },

    handleClick($event) {
      if (this.state === States.LOADING) {
        // Игнорируем клик во время загрузки
        $event.preventDefault();
      } else if (this.state === States.FILLED) {
        $event.preventDefault();
        this.removeFile();
        this.state = States.EMPTY;
        this.$emit('remove');
      }
      // Когда ничего не выбрано, клик обрабатывается по умолчанию, открывая диалог выбора файла
    },

    removeFile() {
      // Файл нельзя удалить нормальным Vue-way способом, нужно напрямую менять DOM
      this.$refs.input.value = '';
      this.localPreview = null;
    },
  },
};
</script>

<style scoped>
/* _image-uploader.css */

.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
