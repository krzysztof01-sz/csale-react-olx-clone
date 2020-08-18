import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBasket,
  faUpload,
  faPlusCircle,
  faTrashAlt,
  faUserCircle,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

// static icons
export const BasketIcon = () => <FontAwesomeIcon icon={faShoppingBasket} color="#f1ad3e" />;
export const UploadIcon = () => <FontAwesomeIcon icon={faUpload} />;
export const TrashIcon = () => <FontAwesomeIcon icon={faTrashAlt} color="#cdcdcd" />;
export const HeaderPlusIcon = () => <FontAwesomeIcon className="headerIcon" icon={faPlusCircle} color="#cdcdcd" />;
export const HeaderUserIcon = () => <FontAwesomeIcon className="headerIcon" icon={faUserCircle} color="#cdcdcd" />;
export const EditIcon = () => <FontAwesomeIcon icon={faEdit} color="#f1ad3e" />;
