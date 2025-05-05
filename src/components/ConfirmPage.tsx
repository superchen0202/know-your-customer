import FormContainer from './FormContainer';
import { useAppSelector } from '@/redux/hooks';
import DataDisplayer from '@/shared/components/DataDisplayer';

const ConfirmPage = () => {
  const basicInfo = useAppSelector((state) => state.basicInfo);
  return (
    <FormContainer>
      <div>ConfirmPage</div>
      <DataDisplayer debugData={basicInfo} />
    </FormContainer>
  );
};

export default ConfirmPage;
