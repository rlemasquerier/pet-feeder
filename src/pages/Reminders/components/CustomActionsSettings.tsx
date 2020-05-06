import React from 'react';
import { CheckBox } from 'pet-feeder/src/components';
import theme from 'pet-feeder/src/theme';
import { CustomAction } from 'pet-feeder/src/types';

interface Props {
  availableCustomActions: CustomAction[];
}

export const CustomActionsSettings: React.FC<Props> = (props: Props) => {
  const { availableCustomActions } = props;
  return (
    <>
      {availableCustomActions &&
        availableCustomActions.map((customAction: CustomAction) => (
          <CheckBox
            key={customAction.name}
            onPress={() => {}}
            color={theme.colors.secondaryAction}
            isChecked={true}
            label={customAction.name}
          />
        ))}
    </>
  );
};
