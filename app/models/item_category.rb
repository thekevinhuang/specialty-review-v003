class ItemCategory < ActiveRecord::Base
    has_many :item_models
    has_many :characteristics, through: :item_models
    belongs_to :activity

    validates :name, presence: true, uniqueness: true
    validates :description, presence: true
end