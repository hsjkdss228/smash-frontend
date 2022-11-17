import { gameStore } from '../stores/GameStore';
import useStore from './useStore';

export default function useGameStore() {
  return useStore(gameStore);
}
