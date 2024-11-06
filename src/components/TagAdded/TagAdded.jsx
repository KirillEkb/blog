import Button from '../Button/Button';

import classes from './TagAdded.module.scss';

const TagAdded = ({ tag, onChange, onKeyDown }) => {
  const deleteTag = (e) => {
    e.preventDefault();
    onChange({ target: { value: '' } });
  };
  return (
    <label className={`${classes.label} ${classes.labelTags}`}>
      <input className={classes.tagInput} placeholder="Tags" value={tag} onKeyDown={onKeyDown} onChange={onChange} />
      <Button pclass="delete" onClick={deleteTag} text="Delete"></Button>
    </label>
  );
};

export default TagAdded;
