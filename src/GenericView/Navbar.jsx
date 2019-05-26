import React, {Component} from 'react';
import {
    Container,
    Dropdown,
    Image,
    Menu,
  } from 'semantic-ui-react'

const Navbar = () => (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
           Test Site
        </Menu.Item>
        <Menu.Item as='a'>Αρχική Σελίδα</Menu.Item>
        <Menu.Item as='a'>Νέα Πώληση</Menu.Item>
        <Menu.Item as='a'>Επιστροφή</Menu.Item>
        <Dropdown item simple text='Επιλογές'>
          <Dropdown.Menu>
            <Dropdown.Item>Ιστορικό</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className='dropdown icon' />
              <span className='text'>Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
)

export default Navbar