import { type BasicInfo } from '@/forms/BasicInformation/schema';
import { getAgeFromBirthDate } from '@/utils/converter';
import { genderMap, GenderOption } from '@/constants/gender';
import { nationMap, PartialCountryCode } from '@/constants/nation';
import parsePhoneNumberFromString, { CountryCode } from 'libphonenumber-js';

const DisplayBasicInfo = (props: BasicInfo) => (
  <div className="rounded-lg border border-gray-200 p-5">
    <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <p className="text-sm text-gray-500">Name</p>
        <p className="font-medium">{props.name || '-'}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Email</p>
        <p className="font-medium">{props.email || '-'}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Phone</p>
        <p className="font-medium">
          {parsePhoneNumberFromString(props.phone, props.nationality as CountryCode)?.format('NATIONAL') || '-'}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Nationality</p>
        <p className="font-medium">{nationMap[props.nationality as PartialCountryCode] || '-'}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Gender</p>
        <p className="font-medium">
          {props.gender && props.gender in genderMap ? genderMap[props.gender as GenderOption] : '-'}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Date of Birth</p>
        <p className="font-medium">
          {props.birthDate || '-'} ({getAgeFromBirthDate(props.birthDate)} years)
        </p>
      </div>
      <div className="md:col-span-2">
        <p className="text-sm text-gray-500">Address</p>
        <p className="font-medium">{props.address || '-'}</p>
      </div>
    </div>
  </div>
);

export default DisplayBasicInfo;
