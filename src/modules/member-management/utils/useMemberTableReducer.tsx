import { MemberTableData } from '../types/views';

type MemberTableReducerState = {
  expiringSoonMembers: MemberTableData[];
  recentlyExpiredMembers: MemberTableData[];
  recentlyRegisteredMembers: MemberTableData[];
};

interface MemberTableReducerAction {
  type: 'setTableData';
  payload: {
    expiringSoonMembers: MemberTableData[];
    recentlyExpiredMembers: MemberTableData[];
    recentlyRegisteredMembers: MemberTableData[];
  };
}

export const memberTableInitialState: MemberTableReducerState = {
  expiringSoonMembers: [],
  recentlyExpiredMembers: [],
  recentlyRegisteredMembers: [],
};

export function useMemberTableReducer(
  _state: MemberTableReducerState,
  action: MemberTableReducerAction,
) {
  switch (action.type) {
    case 'setTableData':
      return {
        expiringSoonMembers: action.payload.expiringSoonMembers,
        recentlyExpiredMembers: action.payload.recentlyExpiredMembers,
        recentlyRegisteredMembers: action.payload.recentlyRegisteredMembers,
      };
    default:
      throw [];
  }
}
