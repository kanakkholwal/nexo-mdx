import { EditorConfig } from '@editor/share/var';

const defaultConfig: EditorConfig = {
  theme: 'default',
  view:"edit",
  htmlClass: '',
  textareaClassName: '',
  syncScrollMode: ['rightFollowLeft', 'leftFollowRight'],
  imageUrl: '',
  imageAccept: '',
  linkUrl: '',
  loggerMaxSize: 100,
  loggerInterval: 600,
  table: {
    maxRow: 4,
    maxCol: 6,
  },
  allowPasteImage: true,
  onImageUpload: undefined,
  onCustomImageUpload: undefined,
  shortcuts: true,
  onChangeTrigger: 'both',
};

export default defaultConfig;
