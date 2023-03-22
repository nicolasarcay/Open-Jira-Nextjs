import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { Layout } from '../component/layouts';
import { EntryList, NewEntry } from '../component/ui';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" sx={{ backgroundColor: 'grey' }} />
            <CardContent>
              <NewEntry />
              <EntryList status="pending" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En progreso" sx={{ backgroundColor: 'grey' }} />
            <CardContent>
              <EntryList status="progress" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Finalizadas" sx={{ backgroundColor: 'grey' }} />
            <CardContent>
              <EntryList status="finished" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
