import React from 'react';
import { CheckBox } from 'pet-feeder/src/components';
import theme from 'pet-feeder/src/theme';
import { CustomAction } from 'pet-feeder/src/types';
import { useCurrentUser, useCurrentTribe } from 'pet-feeder/src/hooks';

interface Props {
  availableCustomActions: CustomAction[];
}

export const CustomActionsSettings: React.FC<Props> = (props: Props) => {
  const { user } = useCurrentUser();
  const { tribe } = useCurrentTribe(user && user.tribeMember[0]);
  if (!tribe) {
    return null;
  }

  const { availableCustomActions } = props;
  const tribeCustomActions = tribe.customActions;

  const isCustomActionEnabled = (customActionId: string) => {
    return tribeCustomActions.filter(intribe => intribe.id === customActionId).length >= 1;
  };

  return (
    <>
      {availableCustomActions &&
        availableCustomActions.map((customAction: CustomAction) => (
          <CheckBox
            key={customAction.name}
            onPress={() => {}}
            color={theme.colors.secondaryAction}
            isChecked={isCustomActionEnabled(customAction.id)}
            label={customAction.name}
          />
        ))}
    </>
  );
};
