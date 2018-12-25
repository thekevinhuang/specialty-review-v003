class ItemModelSerializer < ActiveModel::Serializer
    attributes :id, :name, :description
    belongs_to :item_category
    has_many :item_model_characteristics
end