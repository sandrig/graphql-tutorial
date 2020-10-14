import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Tabs from './components/Tabs/Tabs'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import theme from './components/theme'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
})

export class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <Tabs />
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }
}
