<?php

namespace App\Policies;

use App\Models\User;
use App\Package;
use App\Policies\HasAdmin;
use Illuminate\Auth\Access\HandlesAuthorization;

class PackagePolicy
{
    use HandlesAuthorization;
    use HasAdmin;

    /**
     * Determine whether the user can view the package.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Package  $package
     * @return mixed
     */
    public function view(User $user, Package $package)
    {
        return true;
    }

    /**
     * Determine whether the user can create packages.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->is_admin;
    }

    /**
     * Determine whether the user can update the package.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Package  $package
     * @return mixed
     */
    public function update(User $user, Package $package)
    {
        return $user->is_admin;
    }

    /**
     * Determine whether the user can delete the package.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Package  $package
     * @return mixed
     */
    public function delete(User $user, Package $package)
    {
        return $user->is_admin;
    }
}
