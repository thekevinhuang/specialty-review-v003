class Rating <ActiveRecord::Base
    validates :rating, presence: true, inclusion: 1..5
    belongs_to :user
    belongs_to :item_model_characteristic

    def self.from_parent(user: :user, item_model_characteristic: :item_model_characteristic)
        rating = self.find_or_initialize_by(user_id: user.id, item_model_characteristic_id: item_model_characteristic.id)
    end

    def item_model
        self.item_model_characteristic.item_model
    end

    def characteristic
        self.item_model_characteristic.characteristic
    end
end