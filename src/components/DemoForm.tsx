import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, number, z } from 'zod';
import DataDisplayer from '@/shared/components/DataDisplayer';

const schema = object({
  name: string(),
  age: number(),
});

type Schema = z.infer<typeof schema>;

const DemoForm = () => {
  const { register, handleSubmit, watch } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => console.log(data);

  return (
    <>
      <DataDisplayer debugData={watch()} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} />
        <input {...register('age', { valueAsNumber: true })} type="number" />
        <input type="submit" />
      </form>
    </>
  );
};

export default DemoForm;
