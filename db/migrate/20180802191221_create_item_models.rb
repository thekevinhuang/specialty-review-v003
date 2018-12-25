class CreateItemModels < ActiveRecord::Migration[5.2]
  def change
    create_table :item_models do |t|
      t.string :name
      t.string :description
      t.integer :item_category_id
    end
  end
end
