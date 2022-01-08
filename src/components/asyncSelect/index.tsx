import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React from "react";

interface IProps {
  value: string;
  onLoad: () => Promise<unknown[]>;
  onChange: (event, value) => void;
}

export function AsyncSelect({ value, onChange, onLoad }: IProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const isLoading = isOpen && data.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!isLoading) {
      return;
    }

    (async () => {
      const response = await onLoad();

      if (active) {
        setData(response);
      }
    })();

    return () => {
      active = false;
    };
  }, [isLoading]);

  return (
    <Autocomplete
      open={isOpen}
      onChange={onChange}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      options={data}
      loading={isLoading}
      getOptionLabel={(option) => option.name}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          label=""
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
