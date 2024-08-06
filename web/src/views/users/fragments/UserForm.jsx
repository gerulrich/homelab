import PropTypes from 'prop-types';
import { Grid, MenuItem, Button, FormHelperText, Switch } from '@mui/material';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import CustomFormLabel from '@app/components/customs/CustomFormLabel';
import CustomTextField from '@app/components/customs/CustomTextField';
import useMounted from '@app/components/guards/UseMounted';
import { useTranslation } from 'react-i18next';

export const UserForm = ({ initialValues, onSubmit }) => {
  const mounted = useMounted();
  const { t } = useTranslation();
  const AssetSchema = Yup.object().shape({
    name: Yup.string().required(t('form.validation.name.required')),
    email: Yup.string().email().required(t('form.validation.email.required')),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: AssetSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      setSubmitting(true);
      onSubmit(values);
      try {
        if (mounted.current) {
          setStatus({ success: true });
          setSubmitting(false);
        }
      } catch (err) {
        if (mounted.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          
          {/* Nombre */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.name')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTextField
              id="name"
              placeholder={t('form.placeholder.name')}
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              fullWidth />
          </Grid>

          {/* email */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="email" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.email')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTextField
              id="email"
              placeholder={t('form.placeholder.email')}
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              fullWidth />
          </Grid>

          {/* picture */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.picture')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTextField
              id="picture"
              placeholder={t('form.placeholder.picture')}
              {...getFieldProps('picture')}
              error={Boolean(touched.picture && errors.picture)}
              helperText={touched.picture && errors.picture}
              fullWidth />
          </Grid>

          {/* enabled */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.enabled')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Switch
                name="enabled"
                value={formik.values.enabled}
                onChange={formik.handleChange}
                checked={formik.values.enabled}
              />
          </Grid>

          {/* google */}
          <Grid item xs={12} sm={2} display="flex" alignItems="center">
            <CustomFormLabel htmlFor="picture" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            {t('form.fields.google')}
            </CustomFormLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Switch
                name="google"
                value={formik.values.google}
                onChange={formik.handleChange}
                checked={formik.values.google}
              />
          </Grid>
          
          {/* Botón de Guardar */}
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={9}>
            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
            {t('form.save')}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  )
}

export default UserForm;
