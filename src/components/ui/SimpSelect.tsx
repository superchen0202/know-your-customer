// import { ComponentProps } from 'react';

// type RequireProps<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
// type SelectProps = RequireProps<ComponentProps<'select'>, 'type'> & {
//   error: string | undefined;
// };

// const SimpSelect = ({ nativeSelectprops, options }) => {
//   return (
//     <>
//       <select {...props}>
//         {nationalityOptions.map((option) => (
//           <option key={option.code} value={option.code}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       ;
//     </>
//   );
// };

// export default SimpSelect;
