import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBasket,
  faUpload,
  faPlusCircle,
  faTrashAlt,
  faUserCircle,
  faEdit,
  faInfoCircle,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

// static icons
export const BasketIcon = () => <FontAwesomeIcon icon={faShoppingBasket} color="#f1ad3e" />;
export const UploadIcon = () => <FontAwesomeIcon icon={faUpload} />;
export const TrashIcon = () => <FontAwesomeIcon icon={faTrashAlt} color="#cdcdcd" />;
export const EditIcon = () => <FontAwesomeIcon icon={faEdit} color="#f1ad3e" />;
export const HeaderPlusIcon = () => <FontAwesomeIcon icon={faPlusCircle} className="headerIcon" color="#cdcdcd" />;
export const HeaderUserIcon = () => <FontAwesomeIcon icon={faUserCircle} className="headerIcon" color="#cdcdcd" />;
export const AboutIcon = () => <FontAwesomeIcon icon={faInfoCircle} className="headerIcon" color="#cdcdcd" />;
export const HomeIcon = () => <FontAwesomeIcon icon={faHome} className="headerIcon" color="#cdcdcd" />;
