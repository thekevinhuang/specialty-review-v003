class ItemCategorySerializer < ActiveModel::Serializer
    attributes :id, :name, :description
    belongs_to :activity
    has_many :item_models
end