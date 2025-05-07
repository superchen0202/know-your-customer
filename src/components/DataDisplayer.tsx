import { FC } from 'react';

type DataDisplayerProps = {
  debugData: unknown;
};

const DataDisplayer: FC<DataDisplayerProps> = ({ debugData }) => <pre>{JSON.stringify(debugData, null, 2)}</pre>;

export default DataDisplayer;
