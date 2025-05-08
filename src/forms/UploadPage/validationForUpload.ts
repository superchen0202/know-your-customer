import { UploadFiles } from '@/contexts/FilesHooks';

const requiredFields = {
  idFront: true,
  idBack: true,
} as const satisfies Partial<Record<keyof UploadFiles, true>>;

export type UploadFilesError = Partial<Record<keyof UploadFiles, string>>;

export const validateUploadFiles = (
  formData: UploadFiles,
  required = requiredFields as Partial<Record<keyof UploadFiles, true>>,
): UploadFilesError => {
  const errors: UploadFilesError = {};

  for (const key in required) {
    const fieldName = key as keyof UploadFiles;
    const value = formData[fieldName];

    if (value === undefined) {
      errors[fieldName] = '未上傳檔案';
    } else if (Array.isArray(value) && value.length === 0) {
      errors[fieldName] = '請至少上傳一個檔案';
    }
  }
  return errors;
};
