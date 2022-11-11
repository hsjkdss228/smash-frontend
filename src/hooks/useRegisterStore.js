import { registerStore } from '../stores/RegisterStore';
import useStore from './useStore';

export default function useRegisterStore() {
  return useStore(registerStore);
}
