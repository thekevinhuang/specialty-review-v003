class CreateCharacteristics < ActiveRecord::Migration[5.2]
  def change
    create_table :characteristics do |t|
      t.string :name
      t.string :description
      t.integer :item_model_id
    end
  end
end
