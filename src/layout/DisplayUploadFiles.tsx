import { type UploadDocs } from '@/forms/UploadDocument/schema';
import FileInfo from '@/components/FileInfo';

const DisplayUploadFiles = (props: UploadDocs) => {
  return (
    <div className="rounded-lg border border-gray-200 p-5">
      <h2 className="mb-4 text-lg font-semibold">Uploaded Documents</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">ID Card Front</p>
          {props.idFront ? (
            <FileInfo className="rounded-md border border-gray-200 p-2" file={props.idFront} />
          ) : (
            <p className="text-sm text-red-500">No file uploaded</p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">ID Card Back</p>
          {props.idBack ? (
            <FileInfo className="rounded-md border border-gray-200 p-2" file={props.idBack} />
          ) : (
            <p className="text-sm text-red-500">No file uploaded</p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">Additional Documents</p>
          {props.additionalDocs && props.additionalDocs.length > 0 ? (
            <div className="mt-1 space-y-2">
              {props.additionalDocs.map((file, index) => (
                <FileInfo key={index} className="rounded-md border border-gray-200 p-2" file={file} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No additional documents uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayUploadFiles;
