class Characteristic <ActiveRecord::Base
    
    has_many :item_model_characteristics
    has_many :item_models, through: :item_model_characteristics, uniq: true

    validates :name, presence: true, uniqueness: true
    validates :description, presence: true

end