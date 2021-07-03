import produce from 'immer';

export function reserve(state = [], action) {
  switch (action.type) {
    case 'ADD_RESERVE_SUCCESS':
      return produce(state, (draft) => {
        // const tripIndex = draft.findIndex((trip) => trip.id === action.trip.id);

        // if (tripIndex >= 0) {
        //   draft[tripIndex].amount += 1;
        // } else {
        //   draft.push({
        //     ...action.trip,
        //     amount: 1,
        //   });
        // }

        draft.push(action.trip);
      });

    case 'REMOVE_RESERVE':
      return produce(state, (draft) => {
        const tripIndex = draft.findIndex((trip) => trip.id === action.id);

        if (tripIndex >= 0) {
          draft.splice(tripIndex, 1);
        }
      });

    case 'UPDATE_RESERVE_SUCCESS':
      return produce(state, (draft) => {
        const updateReserve = draft.findIndex((el) => el.id === action.id);

        draft[updateReserve].amount = action.amount;
      });

    default:
      return state;
  }
}
