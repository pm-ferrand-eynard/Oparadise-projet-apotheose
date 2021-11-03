// import NPM
import { Routes, Route } from 'react-router';
// import component
import { useSelector } from 'react-redux';
import Account from '../Account';
import URLError from '../URLError';
import Explore from '../Explore';
import Home from '../Home';
import Contact from '../Contact';
import UserConnect from '../UserConnect';
import UserSubscribe from '../UserSubscribe';
import { Modal } from '../../components';

import style from './Main.module.scss';

const Main = () => {
  const isModalHidden = useSelector((state) => state.domSettings.isModalHidden);
  const isLoginModal = useSelector((state) => state.domSettings.isLoginModal);
  const isSubscribeModal = useSelector((state) => state.domSettings.isSubscribeModal);
  return (
    <div className={style.main}>
      {/* If the modal is openned and the state isLoginModal is true ( so the click was
        on signIn button) then we print the modal and UserConnect */}
      {(isModalHidden === false) && isLoginModal && (
      <Modal>
        <UserConnect />
      </Modal>
      )}
      {/* If the modal is openned and the state isSubscribeModal is true ( so the click was
        on signUp button) then we print the modal and UserSubscribe */}
      {(isModalHidden === false) && isSubscribeModal && (
        <Modal>
          <UserSubscribe />
        </Modal>
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/contact"element={<Contact />} />
        {/* Cette route n'a pas de path, elle sera donc tout le temps appelé si
      aucune a été appelé avant */}
        <Route>
          <URLError />
        </Route>
      </Routes>
    </div>
  );
};

export default Main;
