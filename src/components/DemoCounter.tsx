import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { decrement, increment } from '@/redux/demoCounterSlice';

const DemoCounter = () => {
  // // The `state` arg is correctly typed as `RootState` already
  const { value: count } = useAppSelector((state) => state.demoCounter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default DemoCounter;
