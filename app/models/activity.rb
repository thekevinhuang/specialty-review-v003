class Activity <ActiveRecord::Base
    validates :name, presence: true, uniqueness: true
    validates :description, presence: true
    has_many :item_categories
end