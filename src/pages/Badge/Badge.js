import { Component } from 'react';

// import './Badge.less';

import Badge from 'components/Badge'
export default class PageHome extends Component {

  	render() {
    	const t = this;
		return (
			<div className="demo">
				<h2>badge</h2>
				<Badge 
					count={100}
				>
					<a href="#1" className="demo-item" />
				</Badge>
				<br/>
				<Badge 
					count={5}
					corner="lt"
					text={'促33'}
				>
					<a href="#1" className="demo-item" />
				</Badge>
				<br/>
				<Badge 
				>
				123
				</Badge>
				<br/>
				<Badge text={'33'}>
            		
          		</Badge>
				<br/>
				<Badge text={'99'} corner="lt">
            		<a href="#1" className="demo-item-corn" />
          		</Badge>

				<Badge
					text={'12'} style={{
						left: 10,
					}}
          		/>
				<br/>
				<Badge text={'new'} corner="lt" />
			</div>
		);
  	}
}

