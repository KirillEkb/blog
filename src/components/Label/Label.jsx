import classes from './Label.module.scss';

const Label = ({ label, register, errors }) => {
  return (
    <label key={label.key} className={classes.label}>
      <span className={classes.labelText}>{label.labelText}</span>
      {label.textarea && (
        <textarea
          rows="15"
          className={`${classes.input} ${classes.textarea} ${errors[label.register] ? classes.errorBorder : classes.noErrorBorder}`}
          placeholder={label.labelText}
          defaultValue={label.value}
          {...register(label.register)}
        />
      )}
      {!label.textarea && (
        <input
          className={`${classes.input} ${errors[label.register] ? classes.errorBorder : classes.noErrorBorder}`}
          type={label.type}
          placeholder={label.labelText}
          defaultValue={label.value}
          {...register(label.register)}
        />
      )}
      <p className={`${classes.errorText} ${errors[label.register] ? classes.visible : ''}`}>
        {errors[label.register]?.message}
      </p>
    </label>
  );
};

export default Label;
