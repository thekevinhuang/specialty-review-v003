class RemoveItemModelIdFromCharacteristics < ActiveRecord::Migration[5.2]
  def change
    remove_column :characteristics, :item_model_id
  end
end
