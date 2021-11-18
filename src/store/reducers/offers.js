import {
  READ_OFFERS_DATAS,
  CHANGE_CURRENT_POS_OFFER,
  SET_PICTURES,
} from '../actions';

const initialState = {

  inputValueTitle: '',
  pictures: [],
  inputValueDescription: '',
  isOfferOnline: false,
  inputValueLatCoordinate: '',
  inputValueLongCoordinate: '',
  cardOffers: [],
};

const offersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_INPUT_VALUE_OFFERS':
      return {
        ...state,
        [action.inputField]: action.newValue,
      };

      // here , we are creating a toggle on the online/offline position of the Offer Created.
    case 'TOGGLE_ONLINE_OFFER':
      return {
        ...state,
        isOfferOnline: !state.isOfferOnline,
      };

    case READ_OFFERS_DATAS:
      return {
        ...state,
        cardOffers: action.cardOffers,

      };

    case CHANGE_CURRENT_POS_OFFER:
      return {
        ...state,
        inputValueLatCoordinate: action.inputLatPos,
        inputValueLongCoordinate: action.inputLngPos,
      };
    case SET_PICTURES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default offersReducer;
