class ModifyRatingsCharacteristicId < ActiveRecord::Migration[5.2]
  def change
    rename_column :ratings, :characteristic_id, :item_model_characteristics_id
  end
end
