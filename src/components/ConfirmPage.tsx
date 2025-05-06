import FormContainer from '../shared/components/FormContainer';
import { useAppSelector } from '@/redux/hooks';
import DataDisplayer from '@/shared/components/DataDisplayer';
import FileInfo from '@/shared/components/FileInfo';

const ConfirmPage = () => {
  const { basicInfo, uploadDocs } = useAppSelector((state) => state);

  const { idFront, idBack, additionalDocs } = uploadDocs;

  return (
    <FormContainer>
      <div>ConfirmPage</div>
      <DataDisplayer debugData={basicInfo} />

      <div>
        <div>
          ID Card Front:
          <div className="mt-4 space-y-2">{idFront && <FileInfo file={idFront} />}</div>
        </div>
        <div>
          ID Card Back:
          <div className="mt-4 space-y-2">{idBack && <FileInfo file={idBack} />}</div>
        </div>
        <div>
          Others Docs:
          <div className="mt-4 space-y-2">
            {additionalDocs?.map((file, index) => (
              <FileInfo key={`${file.name}-${index}`} file={file} className="rounded-md border p-3" />
            ))}
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default ConfirmPage;
