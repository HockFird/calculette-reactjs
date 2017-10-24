import React from 'react';
import ReactDOM from 'react-dom';
import {exp} from './import-export.js';
import './style.css';


ReactDOM.render(
  <exp.Structure value={10} />,
  document.getElementById('root')
);
