import { arcademiDataList } from 'pages/seoul_arcademi';
import { atom } from 'recoil';

const zzimState = atom<arcademiDataList[] | []>({
  key: 'zzimState',
  default: [],
});

export { zzimState };
