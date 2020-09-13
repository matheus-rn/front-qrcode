import React, { useState, useCallback } from 'react';
import {
  TextField,
  Grid,
  Paper,
  Zoom,
  Button,
  CircularProgress,
} from '@material-ui/core';
import QRCode from 'qrcode.react';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import { Container, Context } from './styles';
import api from '../../services/api';

const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(45deg, #5EE1D6 30%, #4F60CF 90%)',
  },
  label: {
    textTransform: 'capitalize',
  },
});

const Home: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [qrCodeString, setQrCodeString] = useState('');

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.post('/transactions/', {
        payerIdentifier: '51101547081',
        value: 500,
        recieverIdentifier: '04396243049',
      });

      // Verificar loading
      await new Promise((resolver) => setTimeout(resolver, 1500));

      setQrCodeString(get(response, 'data.qrCodeString', ''));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  return (
    <Container>
      <Context>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Nome da empresa"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="cnpj"
              label="CNPJ"
              name="cnpj"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="amount"
              label="Valor"
              name="amount"
            />
          </Grid>
        </Grid>
        <Button
          classes={{
            root: classes.button,
            label: classes.label,
          }}
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: 20, height: 40 }}
          onClick={handleSubmit}
        >
          {loading ? (
            <CircularProgress
              style={{ color: 'white', width: 25, height: 25 }}
            />
          ) : (
            'Gerar QRCode'
          )}
        </Button>
      </Context>
      <Context>
        <Zoom in={qrCodeString !== ''} style={{ transitionDelay: '500ms' }}>
          <Paper elevation={15} style={{ marginLeft: 30 }}>
            <QRCode value={qrCodeString} size={250} includeMargin={false} />
          </Paper>
        </Zoom>
      </Context>
    </Container>
  );
};
export default Home;
