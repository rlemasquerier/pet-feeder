import React from 'react';
import { useMutation } from 'react-apollo';
import { CheckBox } from 'pet-feeder/src/components';
import theme from 'pet-feeder/src/theme';
import { CustomAction } from 'pet-feeder/src/types';
import { useCurrentUser, useCurrentTribe } from 'pet-feeder/src/hooks';
import { updateTribeCustomActions } from 'pet-feeder/src/graphql/mutations/updateTribeCustomActions';
import { getTribeById } from 'pet-feeder/src/graphql/queries';

interface Props {
  availableCustomActions: CustomAction[];
}

export const CustomActionsSettings: React.FC<Props> = (props: Props) => {
  const { user } = useCurrentUser();
  const { tribe } = useCurrentTribe(user && user.tribeMember[0]);
  const [editTribeCustomActions] = useMutation(updateTribeCustomActions, {
    update(
      cache,
      {
        data: {
          patchTribe: { customActions },
        },
      }
    ) {
      if (user) {
        const cachedTribeById = cache.readQuery({
          query: getTribeById,
          variables: { id: user.tribeMember[0] },
        });
        cache.writeQuery({
          query: getTribeById,
          data: {
            tribeById: {
              // @ts-ignore
              ...cachedTribeById.tribeById,
              customActions,
            },
          },
          variables: { id: user.tribeMember[0] },
        });
      }
    },
  });

  if (!tribe) {
    return null;
  }

  const { availableCustomActions } = props;
  const tribeCustomActions = tribe.customActions;
  const tribeCustomActionsIds = tribeCustomActions.map(action => action.id);

  const isCustomActionEnabled = (customActionId: string) => {
    return tribeCustomActionsIds.includes(customActionId);
  };

  const addCustomActionToTribe = (customActionId: string) => {
    editTribeCustomActions({
      variables: {
        id: tribe.id,
        customActions: [...tribeCustomActionsIds, customActionId],
      },
    });
  };

  const removeCustomActionFromTribe = (customActionId: string) => {
    editTribeCustomActions({
      variables: {
        id: tribe.id,
        customActions: tribeCustomActionsIds.filter(actionId => actionId !== customActionId),
      },
    });
  };

  const onAvailableCustomActionPress = (customActionId: string) => {
    if (isCustomActionEnabled(customActionId)) {
      removeCustomActionFromTribe(customActionId);
    } else {
      addCustomActionToTribe(customActionId);
    }
  };

  return (
    <>
      {availableCustomActions &&
        availableCustomActions.map((customAction: CustomAction) => (
          <CheckBox
            key={customAction.name}
            onPress={() => onAvailableCustomActionPress(customAction.id)}
            color={theme.colors.secondaryAction}
            isChecked={isCustomActionEnabled(customAction.id)}
            label={customAction.name}
          />
        ))}
    </>
  );
};
