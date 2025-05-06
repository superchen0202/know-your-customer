export const createRequiredErrorMsg = (fieldName: string) => `${fieldName} Is Required!`;
export const createOverLengthErrorMsg = (fieldName: string, maxLength: number) =>
  `${fieldName} Cannot Exceed ${maxLength} Characters!`;
export const createInvalidValueErrorMsg = (fieldName: string) => `Invalid ${fieldName} Value!`;

export const descriptionOfUpload = (fieldName: string, maxSize: number) =>
  `Upload the ${fieldName} side of your ID card (jpg, png, pdf formats, ${maxSize} MB size limit)`;

export const getFileTypeLabel = (fileType: File['type']) => {
  if (fileType.startsWith('image/')) return fileType.replace('image/', '').toUpperCase();
  if (fileType === 'application/pdf') return 'PDF';

  // Extract extension from filename if type is not recognized
  const extension = fileType.split('.').pop()?.toUpperCase() || 'UNKNOWN';
  return extension;
};

/**
 * Formats file size in bytes to a human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Converts a File object to a serializable object for Redux storage
 */
export const parseToPartialInfo = (file: File): { name: string; size: string; type: string } => ({
  name: file.name,
  size: formatFileSize(file.size),
  type: file.type,
});
