import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'


class LoginView extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            errors: {}
        }
    }

    handleInput = (event) =>{
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }


    handleSubmit = (e) => {
        const data = {
          username: this.state.username,
          password: this.state.password
        }
        e.preventDefault();
        fetch('http://localhost:8000/api/token-auth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(resp => resp.json()).then(json => {
          localStorage.setItem('token', json.token);
          this.setState({
            username: json.user.username,
            errors: {}
          })
        })
    }

    render() {
        const token = localStorage.getItem('token')
        const {errors} = this.state
        return (
            <div className='login-form'>
            {/*
              Heads up! The styles below are necessary for the correct render of this example.
              You can do same with CSS, the main idea is that all the elements up to the `Grid`
              below must have a height of 100%.
            */}
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}
            </style>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>Test</Header>
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input onChange={this.handleInput} fluid icon='user' iconPosition='left' placeholder='E-mail address' name='username' />
                    <Form.Input
                      fluid
                      onChange={this.handleInput}
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      name='password'
                    />
        
                    <Button color='teal' fluid size='large' onClick={this.handleSubmit}>
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  New to us? <a href='#'>Sign Up</a>
                  <p>Token: {token}</p>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        )
    }
}

export default LoginView;