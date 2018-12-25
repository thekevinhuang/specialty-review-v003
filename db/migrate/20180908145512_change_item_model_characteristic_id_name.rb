class ChangeItemModelCharacteristicIdName < ActiveRecord::Migration[5.2]
  def change
    rename_column :ratings, :item_model_characteristics_id, :item_model_characteristic_id
  end
end
