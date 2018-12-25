class CreateRatings < ActiveRecord::Migration[5.2]
  def change
    create_table :ratings do |t|
      t.integer :rating
      t.integer :user_id
      t.integer :characteristic_id
    end
  end
end
