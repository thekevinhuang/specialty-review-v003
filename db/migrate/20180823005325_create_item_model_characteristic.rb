class CreateItemModelCharacteristic < ActiveRecord::Migration[5.2]
  def change
    create_table :item_model_characteristics do |t|
      t.integer :item_model_id
      t.integer :characteristic_id
    end
  end
end
