import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const NewSidebar = () => {
	return (
		<Sidebar className='h-screen'>
			<Menu menuItemStyles={{
				button: {
					// the active class will be added automatically by react router
					// so we can use it to style the active menu item
					[`&.active`]: {
						backgroundColor: '#13395e',
						color: '#b6c8d9',
					},
				},
			}}>
				<MenuItem component={<Link to="/dashboard" />}> Dashboard </MenuItem>
				<SubMenu label="Hotspot">
					<MenuItem component={<Link to="/userlist" />}> User List </MenuItem >
					<MenuItem component={<Link to="/adduser" />}> Add User </MenuItem>
				</SubMenu>
				<SubMenu label="User Profile">
					<MenuItem component={<Link to="/profilelist" />}> Profile List </MenuItem>
					<MenuItem component={<Link to="/addprofile" />}> Add Profile </MenuItem>
				</SubMenu>
				<SubMenu label="Website">
					<MenuItem component={<Link to="/whitelist" />}> Whitelist </MenuItem>
					<MenuItem component={<Link to="/addlist" />}> Add list </MenuItem>
				</SubMenu>
			</Menu>
		</Sidebar>
	)
}

export default NewSidebar