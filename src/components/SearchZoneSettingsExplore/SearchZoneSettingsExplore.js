/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import style from './SearchZoneSettingsExplore.module.scss';
import ButtonSubmit from '../ButtonSubmit';
import {
  CHANGE_INPUT_TIME_VALUE,
  CHANGE_INPUT_MILES_VALUE,
  CHANGE_INPUT_TRANS_VALUE,
  CHANGE_RADIO_BUTTON,
  GET_ISOCHRONE,
  GET_DATAS_FROM_API,
  TOGGLE_OPEN_EXPLORE_SLIDE,
} from '../../store/actions';
import getAllCheckedCheckboxs from '../../store/selectors/getAllCheckedCheckboxs';
import AutoComplete from '../Autocomplete/Autocomplete';
import InputSwitch from '../InputSwitch';

const SearchZoneSettings = () => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const inputValueTime = useSelector((state) => state.search.inputValueTime);
  const inputValueMiles = useSelector((state) => state.search.inputValueMiles);
  const inputValueTrans = useSelector((state) => state.search.inputValueTrans);
  const valueRadio = useSelector((state) => state.search.valueRadio);
  const milesConverted = Math.round(Number(inputValueMiles) / 1000);
  const timeConverted = Math.round(Number(inputValueTime) / 60);
  const allCheckboxs = useSelector((state) => state.search.apiSettings);
  const history = useHistory();

  return (
    <div className={location === '/explore' ? style.search__zoneExplore : style.search__zone}>
      <form
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();
          history.push('/explore');
          if (Number(valueRadio) === 1) {
            dispatch({ type: GET_ISOCHRONE });
          }
        }}
      >
        {/* <h4 className={style.search__zone__title}>Recherche par distance</h4> */}
        <div className={style.search__adress}>
          {/* <span className={location === '/explore' ? style.search__legend__address : style.container__selects__none}>Recherche par adresse...</span> */}

          <AutoComplete />
          <InputSwitch />
        </div>

        <div className={style.container__selects}>
          <div className={style.container__selects__content}>
            <input
              type="radio"
              defaultChecked={Number(valueRadio) === 2}
              name="choice"
              value="2"
              onChange={(e) => {
                dispatch({
                  type: CHANGE_RADIO_BUTTON,
                  inputRadio: 'valueRadio',
                  newValue: e.target.value,
                });
              }}
            />
            <select
              disabled={Number(valueRadio) !== 2}
              name="radius"
              className={location === '/explore' ? style.container__selects__none : style.container__selects__content__select}
              value={inputValueMiles}
              onMouseUp={() => {
                if (getAllCheckedCheckboxs(allCheckboxs).length > 0) {
                  getAllCheckedCheckboxs(allCheckboxs).forEach((checkBoxeName) => {
                    dispatch({
                      type: GET_DATAS_FROM_API,
                      keyword: checkBoxeName,
                    });
                  });
                }
              }}
              onChange={(e) => {
                dispatch({
                  type: CHANGE_INPUT_MILES_VALUE,
                  inputField: 'inputValueMiles',
                  newValue: e.target.value,
                });
              }}
            >
              <option value="">Sur une distance de...</option>
              <option value="1000">1 km</option>
              <option value="2000">2 km</option>
              <option value="3000">3 km</option>
              <option value="5000">5 km</option>
              <option value="10000">10 km</option>
              <option value="15000">15 km</option>
              <option value="20000">20 km</option>
              <option value="25000">25 km</option>
              <option value="30000">30 km</option>
              <option value="40000">40 km</option>
              <option value="50000">50 km</option>
            </select>
            <div className={location === '/explore' ? style.slider__input : style.container__selects__none}>
              <span className={location === '/explore' ? style.search__legend : style.container__selects__none}>Recherche par distance...</span>
              <span className={style.slider__input__display}>{milesConverted} km</span>
              <input
                disabled={Number(valueRadio) !== 2}
                step={1000}
                type="range"
                min="1000"
                max="50000"
                value={inputValueMiles}
                onChange={(e) => {
                  dispatch({
                    type: CHANGE_INPUT_MILES_VALUE,
                    inputField: 'inputValueMiles',
                    newValue: e.target.value,
                  });
                }}
                onMouseUp={() => {
                  //   // here we check if only one box is checked, if yes
                  //   // we loop on the checked checkboxs array, and for each one
                  //   // we dispatch GET_DATAS_FROM_API to request the api
                  console.log(getAllCheckedCheckboxs(allCheckboxs));
                  if (getAllCheckedCheckboxs(allCheckboxs).length > 0) {
                    getAllCheckedCheckboxs(allCheckboxs).forEach((checkBoxeName) => {
                      dispatch({
                        type: GET_DATAS_FROM_API,
                        keyword: checkBoxeName,
                      });
                    });
                  }
                }}
              />
            </div>
          </div>
          <div className={style.container__selects__content}>
            <input
              type="radio"
              name="choice"
              defaultChecked={Number(valueRadio) === 1}
              value="1"
              onChange={(e) => {
                dispatch({
                  type: CHANGE_RADIO_BUTTON,
                  inputRadio: 'valueRadio',
                  newValue: e.target.value,
                });
              }}
            />
            <div className={location === '/explore' ? style.slider__input : style.container__selects__none}>
              <span className={location === '/explore' ? style.search__legend : style.container__selects__none}>Recherche par temps de trajet...</span>
              <span className={style.slider__input__display}>{timeConverted} min</span>
              <input
                disabled={Number(valueRadio) === 2}
                step={100}
                type="range"
                min="900"
                onMouseUp={() => {
                  dispatch({ type: GET_ISOCHRONE });
                  //   // here we check if only one box is checked, if yes
                  //   // we loop on the checked checkboxs array, and for each one
                  //   // we dispatch GET_DATAS_FROM_API to request the api
                  if (getAllCheckedCheckboxs(allCheckboxs).length > 0) {
                    getAllCheckedCheckboxs(allCheckboxs).forEach((checkBoxeName) => {
                      dispatch({
                        type: GET_DATAS_FROM_API,
                        keyword: checkBoxeName,
                      });
                    });
                  }
                }}
                max="3600"
                value={inputValueTime}
                onChange={(e) => {
                  dispatch({
                    type: CHANGE_INPUT_TIME_VALUE,
                    inputField: 'inputValueTime',
                    newValue: e.target.value,
                  });
                }}
              />
            </div>
            <select
              disabled={Number(valueRadio) === 2}
              name="isochrone"
              className={location === '/explore' ? style.container__selects__none : style.container__selects__content__select}
              value={inputValueTime}
              onChange={(e) => {
                dispatch({
                  type: CHANGE_INPUT_TIME_VALUE,
                  inputField: 'inputValueTime',
                  newValue: e.target.value,
                });
              }}
            >
              <option value="">À moins de...</option>
              <option value="900">15 Minutes</option>
              <option value="1800">30 Minutes</option>
              <option value="2700">45 Minutes</option>
              <option value="3600">1 heure</option>
            </select>
          </div>
          <div className={style.container__selects__content}>
            <select
              disabled={Number(valueRadio) === 2}
              name="means"
              className={style.container__selects__content__select__transport}
              value={inputValueTrans}
              onChange={(e) => {
                dispatch({
                  type: CHANGE_INPUT_TRANS_VALUE,
                  inputField: 'inputValueTrans',
                  newValue: e.target.value,
                });
              }}
            >
              <option value="">Moyen de transport...</option>
              <option value="voiture">Voiture</option>
              <option value="piéton">Piéton</option>
              <option value="vélo">Vélo</option>
              <option value="bus">Bus</option>
              <option value="train">Train </option>
            </select>
          </div>
        </div>
        <div className={style.search__button}>
          <ButtonSubmit
            buttonName="C'est parti !"
            classCSS=""
            handleButtonClick={() => {
              dispatch({
                type: TOGGLE_OPEN_EXPLORE_SLIDE,
                openslide: 'isMapSlideOpen',
              });
            }}
          />
        </div>
      </form>
    </div>
  );
};
export default SearchZoneSettings;
