import { Route,HashRouter as Router,Switch } from 'react-router-dom'
import { Component } from 'react';
import { render } from 'react-dom';
import FastClick from 'fastclick'; 

import Badge from 'pages/Badge';
import _Switch from 'pages/Switch';
import Toast from 'pages/Toast';
import Boxs from 'pages/Boxs';
import PasswordInput from 'pages/PasswordInput';
import Progress from 'pages/Progress';
import Scroller from 'pages/Scroller'; // 有点问题
import Datetime from 'pages/Datetime';
import Slot from 'pages/Slot';
import Popup from 'pages/Popup';


import './app.less';

// bind fastclick
FastClick.attach(document.body);

render(
  	<Router>
  		<div>
			<Switch>
				<Route exact path="/" component={Slot} />
			</Switch>
  		</div>
	</Router>,
  	document.getElementById('App'),
);
