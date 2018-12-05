<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Initial extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * Clients schema
         */
        Schema::create('customers', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();

            $table->string('name', 255);
            $table->string('address', 255);
            $table->string('last_name', 255);
            $table->timestamp('birthday_date')->default(\DB::raw('CURRENT_TIMESTAMP'));
            $table->integer('phone')->nullable();
            // $table->integer('user_id')->unsigned();  // Relationship to laravel user model
            $table->integer('cellphone')->nullable();
            $table->integer('identification_number');
            $table->string('identification_type', 10);  // CC, CE, TI, Passaport
            $table->string('status', 1)->default('A');  // A (Active), D (Deleted)
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
